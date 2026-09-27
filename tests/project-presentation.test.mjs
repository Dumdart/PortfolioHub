import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { createRouter, createMemoryHistory } from 'vue-router';

const server = await createServer({root:fileURLToPath(new URL('..',import.meta.url)),server:{middlewareMode:true},appType:'custom'});
after(()=>server.close());
const { default: View } = await server.ssrLoadModule('/src/views/ProjectsView.vue');
const { projects } = await server.ssrLoadModule('/src/data/projects.ts');
async function render(query='') {
  const router=createRouter({history:createMemoryHistory(),routes:[{path:'/projects',name:'projects',component:View}]});
  await router.push('/projects'+query);await router.isReady();
  const app=createSSRApp({render:()=>h(View)});app.use(router);return renderToString(app);
}
test('basic view renders one primary visual and keeps technical content out of the page', async()=>{
  const html=await render('?project=topicgate');
  assert.match(html,/I started TopicGate/);
  assert.match(html,/<button[^>]*aria-expanded="false"[^>]*aria-controls="advanced-content"/);
  assert.doesNotMatch(html,/role="switch"|case-switch/);
  assert.doesNotMatch(html,/class="case-advanced"|role="tablist"|Next image/);
  assert.equal((html.match(/class="case-gallery"/g)||[]).length,1);
});
test('only an exact advanced query renders the ordered technical sections',async()=>{
  for(const query of ['?advanced=false','?advanced=yes','?advanced=true&advanced=false'])assert.doesNotMatch(await render(query),/class="case-advanced"/);
  const html=await render('?project=nova&advanced=true');
  assert.match(html,/<button[^>]*aria-expanded="true"[^>]*aria-controls="advanced-content"/);
  assert.match(html,/class="case-advanced"/);
  assert.match(html,/Put permissions in the backend/);
});
test('a project with no optional blocks has no empty region or useless disclosure',async()=>{
  const original=projects[0].advancedBlocks;
  try {projects[0].advancedBlocks=[];const html=await render('?advanced=true');assert.doesNotMatch(html,/class="case-mode"|id="advanced-content"/);assert.match(html,/I started TopicGate/);}
  finally {projects[0].advancedBlocks=original;}
});

test('light masthead navigation is scoped to detail pages and excludes the document viewer', async()=>{
  const { default: Header } = await server.ssrLoadModule('/src/components/SiteHeader.vue');
  for(const name of ['projects','about','certificates','credential-document','home']) {
    const router=createRouter({history:createMemoryHistory(),routes:[{path:'/',name,component:Header,meta:name==='credential-document'?{headerVariant:'certificates'}:{}},...['/about','/certificates','/projects'].map(path=>({path,component:{render:()=>null}}))]});
    await router.push('/');await router.isReady();
    const app=createSSRApp({render:()=>h(Header)});app.use(router);
    const html=await renderToString(app);
    assert.equal(html.includes('site-header--detail'),['projects','about','certificates'].includes(name),name);
  }
});

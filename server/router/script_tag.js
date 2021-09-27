import Router from 'koa-router';
import { createScriptTag, deleteScriptTagByID, getAllScriptTags } from '../controllers/script_tag_controller';
const router = new Router({prefix: '/script_tag'});

router.get('/', async(ctx) => {
    ctx.body = 'Get a script tag';
})

router.get('/all', async(ctx) => {
    const result = await getAllScriptTags(ctx.myClient, "https://techicovery.com/shopify-apps/split-payment/global.js");
    ctx.body = {
        installed: result.length > 0,
        details: result,
    };
    console.log(result)
})

router.post('/', async(ctx) => {
    console.log(ctx.sesionFromToken);
    //const { shop, accessToken } = ctx.sesionFromToken;
    await createScriptTag(ctx.myClient);
    ctx.body = "Create a script tag";
})

router.delete('/', async(ctx) => {
    const id = ctx.query.id;
    const result = await deleteScriptTagByID(ctx.myClient, id);
    ctx.body = result;
})

export default router;
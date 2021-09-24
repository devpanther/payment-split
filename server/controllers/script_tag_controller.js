import {DataType} from '@shopify/shopify-api';

export const createScriptTag = async (client) => {
    if(client){
        const data = {
            script_tag: {
                event: 'onload',
                src: 'https://facebook.com'
            }
        }
        const result = await client.post({
            path: 'script_tags',
            data,
            type: DataType.JSON
        });

        console.log('Result for REST', result)
        return result;
    }
    console.error('Unabe to complete this')
}

export const getAllScriptTags = async (client, src) => {
    if(!client){
        console.error("Could not make the rest request as the client");
        return;
    }
    const result = await client.get({
        path: 'script_tags',
    });
    const match = result.body.script_tags.filter(tag => tag.src === src);
    console.log('match', match)
    return match;
}

export const deleteScriptTagByID = async (client, id) => {
    if(!client){
        console.error("Could not make the rest request as the client");
        return;
    }
    const result = await client.delete({
        path: `script_tags/${id}`,
    });
    console.log(result);
    return result;
}

const getBaseURL = (shop) => {
    return `https://${shop}`;
}

const getAllScriptTagsURL = (shop) => {
    return `${getBaseURL(shop)}/GET /admin/api/2021-07/script_tags.json`
}

const getScriptTagURL = (shop, id) => {
    return `${getBaseURL(shop)}/admin/api/2021-07/script_tags/${id}.json`
}

const getCreateScriptTagURL = (shop) => {
    return `${getBaseURL(shop)}/admin/api/2021-07/script_tags.json`
}

const getDeleteScriptTagURL = (shop, id) => {
    return `${getBaseURL(shop)}/admin/api/2021-07/script_tags/${id}.json`
}
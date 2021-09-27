import { Layout, Page, SettingToggle, TextStyle } from '@shopify/polaris'
import React, { useState, useEffect } from 'react';
import { useAxios } from '../hooks/useAxios';

const url = process.env.HOST;

function install() {
    const [axios] = useAxios()
    const [isInstalled, setIsInstalled] = useState(null);
    const [scriptTagID, setscriptTagID] = useState()
    const titleDescription = isInstalled ? "Uninstall" : "Install";
    const bodyDescription = isInstalled ? "installed" : "uninstalled";

    async function fetchScriptTags(){
        const {data} = await axios.get(`https://split-payment-shopify.herokuapp.com/script_tag/all`);
        console.log('initial script', data);
        setIsInstalled(data?.installed);
        if(data?.details.length > 0){
            setscriptTagID(data.details[0].id)
        }

    }

    useEffect(() => {
        fetchScriptTags();
    }, [scriptTagID])

    const handleAction = async () => {
        if(!isInstalled){
            axios.post(`https://split-payment-shopify.herokuapp.com/script_tag`)
        }else{
            axios.delete(`https://split-payment-shopify.herokuapp.com/script_tag?id=${scriptTagID}`);
        }
        setIsInstalled(oldValue => !oldValue);
    }

    return (
        <Page>
            <Layout.AnnotatedSection
                title={`${titleDescription} banner`}
                description="Toggle banner installation on your shop"
            >
                <SettingToggle
                    action={{
                        content: titleDescription,
                        onAction: handleAction
                    }}
                    enabled={true}
                >
                    The banner script is <TextStyle variation="strong">{bodyDescription}</TextStyle>
                </SettingToggle>
            </Layout.AnnotatedSection>
        </Page>
    )
}

export default install

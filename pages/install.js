import { Layout, Page, SettingToggle, TextStyle } from '@shopify/polaris'
import React, { useState, useEffect } from 'react';
import { useAxios } from '../hooks/useAxios';

function install() {
    const [axios] = useAxios()
    const [isInstalled, setIsInstalled] = useState(null);
    const [scriptTagID, setscriptTagID] = useState()
    const titleDescription = isInstalled ? "Uninstall" : "Install";
    const bodyDescription = isInstalled ? "installed" : "uninstalled";

    async function fetchScriptTags(){
        const {data} = await axios.get(`https://8a77-160-152-30-29.ngrok.io/script_tag/all`);
        console.log('initial script', data);
        setIsInstalled(data?.installed);
        if(data?.details.length > 0){
            setscriptTagID(data.details[0].id)
        }
    }

    useEffect(() => {
        fetchScriptTags();
    }, [scriptTagID, isInstalled])

    const handleAction = async () => {
        if(!isInstalled){
            axios.post(`https://8a77-160-152-30-29.ngrok.io/script_tag`)
        }else{
            axios.delete(`https://8a77-160-152-30-29.ngrok.io/script_tag?id=${scriptTagID}`);
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

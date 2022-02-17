import Config from 'constants/config'

const fetchContentful = (contentModel, onSuccess, onError) => {
    fetch(
        `https://cdn.contentful.com/spaces/${Config.ContentfulSpaceId}/entries?access_token=${Config.ContentfulAccessToken}&include=2&content_type=${contentModel}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    ).then(async (res) => {
        if (res.ok && res.status === 200) {
            onSuccess(await res.json())
        } else {
            onError(res.json())
        }
    });
}

const getAnuncios = (onSuccess, onError) => {
    fetchContentful('anuncios', onSuccess, onError)
}

const getDevocionales = (onSuccess, onError) => {
    fetchContentful('devocional', onSuccess, onError)
}

const getPalabrasDiarias = (onSuccess, onError) => {
    fetchContentful('palabraDiaria', onSuccess, onError)
}

const getPredicas = (onSuccess, onError) => {
    fetchContentful('predica', onSuccess, onError)
}

const getDrawerItems = (onSuccess, onError) => {
    fetchContentful('drawerItem', onSuccess, onError)
}

const getIglesias = (onSuccess, onError) => {
    fetchContentful('iglesia', onSuccess, onError)
}

export default {
    getAnuncios,
    getDevocionales,
    getPalabrasDiarias,
    getPredicas,
    getDrawerItems,
    getIglesias,
}
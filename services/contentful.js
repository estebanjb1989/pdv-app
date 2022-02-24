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

export default fetchContentful
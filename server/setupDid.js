const axios = require('axios');

const init = async function () {

    const dids = (await axios({
        url: 'https://api.totalvoice.com.br/did',
        method: 'get',
        headers: {
            'access-Token': '5e3f6a3a5021abb4c542b46b3c35e096'
        },
        data: {
            ura_id: XXXX,
            ramal_id: null
        }
    })).data;
    console.log(dids);
};

init();
const axios = require('axios');

const init = async function () {

    const ura = (await axios({
        url: 'https://api.totalvoice.com.br/ura',
        method: 'post',
        headers: {
            'access-Token': 'XXXXXXXXXXXXXXXXXXXX'
        },
        data: {
            nome: `Ura ${Math.floor(Math.random() * 10000)}`,
            dados: [{
                    acao: 'tts',
                    coletar_dtmf: "6",
                    timeout: "30",
                    acao_dados: {
                        mensagem: 'A Ura diz Hello, digite o codigo que esta na sua tela'
                    }
                },
                {
                    acao: 'dinamico',
                    acao_dados: {
                        url: 'https://ef4277f4c5237df075c650a0dad0fed1.m.pipedream.net'
                    },

                }

            ]
        }

    })).data;
    console.log(ura);

};



init();
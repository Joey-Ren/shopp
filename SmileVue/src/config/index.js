let baseUrl 

let enconfig = 'test'

switch(enconfig){
    case 'dev':
    baseUrl = 'https://www.easy-mock.com/mock/5ae26ea500247c2aa1efe478/shopp/api'
    break;
    case 'test':
    baseUrl = 'http://localhost:3000'
    break;
    case 'ip':
    baseUrl = '192.168.1.101'
    break

}

export default {
    baseUrl:baseUrl
}
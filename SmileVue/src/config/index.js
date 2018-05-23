let baseUrl 

let enconfig = 'dev'

switch(enconfig){
    case 'dev':
    baseUrl = 'https://www.easy-mock.com/mock/5ae26ea500247c2aa1efe478/shopp/api'
    break;
    case 'test':

    break

}

export default {
    baseUrl:baseUrl
}
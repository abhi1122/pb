import appConfig from "../../config/app-config";
const loadConfig=()=>{
    let envConfig=require("../../config/env/"+process.env.env_server+"/index");
    let appConfigData={...appConfig, ...envConfig};
    for(const key in appConfigData){
        let value=appConfigData[key].replace(/[${}]/g,'');
        if(process.env[value]){
            appConfig[key]=process.env[value];
        }else{
            appConfig[key]=envConfig[value];
        }
    }
}
loadConfig();
export const config=appConfig;
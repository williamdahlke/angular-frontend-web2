export class Convert{
    dateToRest(data : string) {
        if (data){
            let dia, mes, ano;
            if (data.indexOf("/") == -1){
                dia = data.substring(0,2);
                mes = data.substring(2,4);
                ano = data.substring(4);
            } else{
                [dia,mes,ano] = data.split("/");
            }
            return `${ano}-${mes}-${dia}`
        }
        return "";
    }

    dateFromRest(data : string){
        if (data){
            const [ano, mes, dia] = data.split("-");
            return `${dia}/${mes}/${ano}`;
        }
        return "";
    }
}
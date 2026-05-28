
import { api } from "../lib/api"
import { API_ROUTES } from "../constants/apiRoutes"
import { toast } from "sonner";

export const relatorioService  = {

    async gerarRelatorio(metricas, user) {

        try {
        //colocar .env no projeto para guardar a URL do backend
        const response = await fetch(`http://localhost:8000/relatorio/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ metricas, user }),
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `relatorio_${user.name.replace(/\s+/g, '_')}_${Date.now()}.xlsx`;
        document.body.appendChild(link);

        this.enviarRelatorio(blob);

        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success('Relatório gerado com sucesso!');
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        toast.error('Falha ao gerar relatório');          
    }
},  

    async enviarRelatorio(relatorio) {

        try
            {   
        const response = await api.post(API_ROUTES.RELATORIO, relatorio, { headers : {
            'Content-Type': 'multipart/form-data'}
        }
        );
        toast.success('Relatório enviado com sucesso!');
        return response.data;
        } catch (error) {
            toast.error('Falha ao tentar enviar o relatorio para /reports',error.status);
        }


    }





}
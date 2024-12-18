import axios from "axios";
import { Request, Response } from "express";


export class QuackController{

    static getRandonQuack = async (req: Request, res: Response) => {
        try {
            const response = await axios.get('https://random-d.uk/api/quack');

            if(response.status===200){
                return res.send(response.data)
            }else {
                // Manejo de errores de la API
                res.status(response.status).json({
                    success: false,
                    message: 'Error al obtener datos de la API externa',
                });
            }
                
        } catch (error) {
            console.error('Error al consumir la API externa:', error);
            res.status(500).json({
                success: false,
                message: 'Hubo un problema al obtener los datos',
                error: error.message,
            });
        }
        
    }

    static getListaQuacks = async (req: Request, res: Response) => {
        try {
            const response = await axios.get('https://random-d.uk/api/list');

            if(response.status===200){
                return res.send(response.data)
            }else {
                // Manejo de errores de la API
                res.status(response.status).json({
                    success: false,
                    message: 'Error al obtener datos de la API externa',
                });
            }
                
        } catch (error) {
            console.error('Error al consumir la API externa:', error);
            res.status(500).json({
                success: false,
                message: 'Hubo un problema al obtener los datos',
                error: error.message,
            });
        }
        
    }


}


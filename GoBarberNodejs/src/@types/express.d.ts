//overwrite a type into express
declare namespace Express{
    export interface Request{
        user:{
            id: string;
        };
    }
}
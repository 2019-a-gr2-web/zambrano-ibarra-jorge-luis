export interface Tragos{
    id?:number;
    nombre:string;
    tipo: 'Ron'| 'Vodka' | 'Whiskey' | 'Tequila' | 'Puntas' | 'Cervezas';
    gradosAlcohol:number;
    fechaCaducidad:Date;
    precio:number
}
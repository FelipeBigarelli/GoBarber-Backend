interface ITemplateVariables {
    [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
    file: string;
    variables: ITemplateVariables; // passar qualquer tipo de obj que a chave eh uma string
}

// variables: { name: 'Felipe', link: 'http://...' }

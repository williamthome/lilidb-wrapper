export interface IParser<TToParse, TParsed> {
  parse: (toParse: TToParse) => Promise<TParsed>
}

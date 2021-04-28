export interface IParser<ToParse, Parsed> {
  parse: (toParse: ToParse) => Promise<Parsed>
}

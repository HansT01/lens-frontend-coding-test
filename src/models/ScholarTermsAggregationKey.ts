export enum ScholarTermsAggregationKey {
  Dates = 'dates',
  Country = 'author.affiliation.address.country_code',
  Institution = 'author.affiliation.name.exact',
  Inventor = 'inventor.name.exact',
  Author = 'author.display_name.exact',
  Authors = 'authors'
}

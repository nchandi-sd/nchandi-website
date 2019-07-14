export interface Panels {
  version: string;
  encoding: string;
  feed: Feed;
}
export interface Feed {
  xmlns: string;
  xmlns$openSearch: string;
  xmlns$gsx: string;
  id: NameOrEmailOrIdOrUpdatedOrGsx$facilityOrGsx$locationOrGsx$dayOrGsx$timeOrGsx$genderOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  updated: NameOrEmailOrIdOrUpdatedOrGsx$facilityOrGsx$locationOrGsx$dayOrGsx$timeOrGsx$genderOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  category?: (CategoryEntity)[] | null;
  title: TitleOrContent;
  link?: (LinkEntity)[] | null;
  author?: (AuthorEntity)[] | null;
  openSearch$totalResults: NameOrEmailOrIdOrUpdatedOrGsx$facilityOrGsx$locationOrGsx$dayOrGsx$timeOrGsx$genderOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  openSearch$startIndex: NameOrEmailOrIdOrUpdatedOrGsx$facilityOrGsx$locationOrGsx$dayOrGsx$timeOrGsx$genderOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  entry?: (EntryEntity)[] | null;
}
export interface NameOrEmailOrIdOrUpdatedOrGsx$facilityOrGsx$locationOrGsx$dayOrGsx$timeOrGsx$genderOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex {
  $t: string;
}
export interface CategoryEntity {
  scheme: string;
  term: string;
}
export interface TitleOrContent {
  type: string;
  $t: string;
}
export interface LinkEntity {
  rel: string;
  type: string;
  href: string;
}
export interface AuthorEntity {
  name: NameOrEmailOrIdOrUpdatedOrGsx$facilityOrGsx$locationOrGsx$dayOrGsx$timeOrGsx$genderOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  email: NameOrEmailOrIdOrUpdatedOrGsx$facilityOrGsx$locationOrGsx$dayOrGsx$timeOrGsx$genderOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
}
export interface EntryEntity {
  id: NameOrEmailOrIdOrUpdatedOrGsx$facilityOrGsx$locationOrGsx$dayOrGsx$timeOrGsx$genderOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  updated: NameOrEmailOrIdOrUpdatedOrGsx$facilityOrGsx$locationOrGsx$dayOrGsx$timeOrGsx$genderOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  category?: (CategoryEntity)[] | null;
  title: TitleOrContent;
  content: TitleOrContent;
  link?: (LinkEntity)[] | null;
  gsx$facility: NameOrEmailOrIdOrUpdatedOrGsx$facilityOrGsx$locationOrGsx$dayOrGsx$timeOrGsx$genderOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$location: NameOrEmailOrIdOrUpdatedOrGsx$facilityOrGsx$locationOrGsx$dayOrGsx$timeOrGsx$genderOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$day: NameOrEmailOrIdOrUpdatedOrGsx$facilityOrGsx$locationOrGsx$dayOrGsx$timeOrGsx$genderOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$time: NameOrEmailOrIdOrUpdatedOrGsx$facilityOrGsx$locationOrGsx$dayOrGsx$timeOrGsx$genderOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$gender: NameOrEmailOrIdOrUpdatedOrGsx$facilityOrGsx$locationOrGsx$dayOrGsx$timeOrGsx$genderOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$panelcoordinator: NameOrEmailOrIdOrUpdatedOrGsx$facilityOrGsx$locationOrGsx$dayOrGsx$timeOrGsx$genderOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$boardchampion: NameOrEmailOrIdOrUpdatedOrGsx$facilityOrGsx$locationOrGsx$dayOrGsx$timeOrGsx$genderOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
}

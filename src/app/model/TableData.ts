export interface TableData {
  version: string;
  encoding: string;
  feed: Feed;
}
export interface Feed {
  xmlns: string;
  xmlns$openSearch: string;
  xmlns$gsx: string;
  id: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  updated: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  category?: (CategoryEntity)[] | null;
  title: TitleOrContent;
  link?: (LinkEntity)[] | null;
  author?: (AuthorEntity)[] | null;
  openSearch$totalResults: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  openSearch$startIndex: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  entry?: (EntryEntity)[] | null;
}
export interface NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex {
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
  name: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  email: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
}
export interface EntryEntity {
  id: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  updated: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  category?: (CategoryEntity)[] | null;
  title: TitleOrContent;
  content: TitleOrContent;
  link?: (LinkEntity)[] | null;
  gsx$dayofweek: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$weekofmonth: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$time: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$facility: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$location: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$menwomen: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$needed: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$panelcoordinator: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$boardchampion: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
}

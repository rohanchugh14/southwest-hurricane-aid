export type County = {
  id: integer;
  name: string;
  est: number;
  population: number;
  area: number;
  map: string;
  county_seat: string;
  aid_organizations?: AidOrganization[];
  hurricanes?: Hurricane[];
}

export type Hurricane = {
  id: number;
  areas_affected: string;
  caption: string;
  category: number;
  damage: string;
  damage_number: number;
  deaths: string;
  deaths_number: number;
  dissipated: string;
  formed: string;
  highest_winds: string;
  highest_winds_mph: number;
  image: string;
  lowest_pressure: string;
  lowest_pressure_mbar: number;
  name: string;
  url: string;
  counties?: County[];
}

export type AidOrganization = {
    id: number;
    shelter_name: string;
    address_1: string;
    city: string;
    state: string;
    county: County;
    zipcode: string;
    ada_compliant: string | null;
    wheelchair_accessible: string | null;
    generator_onsite: string | null;
    self_sufficient_electricity: string | null;
    in_surge_slosh_area: string | null;
    org_organization_name: string | null;
    org_main_phone: string | null;
    org_email: string | null;
    score: number | null;
    in_100_yr_floodplain: string | null;
    status: string | null;
    longitude: number;
    latitude: number;
    hurricanes?: Hurricane[];
}

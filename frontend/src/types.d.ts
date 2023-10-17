export type Hurricane = {
  id: number;
  areas_affected: string;
  caption: string;
  category: number;
  counties_mentioned: string;
  damage: string;
  deaths: string;
  dissipated: string;
  formed: string;
  highest_winds: string;
  image: string;
  lowest_pressure: string;
  name: string;
  url: string;
}

export type AidOrganization = {
    id: number;
    shelter_name: string;
    address_1: string;
    city: string;
    state: string;
    county_parish: string;
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
}

export type County = {
  id: integer;
  name: string;
  est: number;
  population: number;
  area: number;
  map: string;
}
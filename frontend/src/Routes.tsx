const HOST = 'http://localhost:4000';
//const HOST = 'https://api.southwesthurricaneaid.me'
const Routes = {
  HOST,
  hurricanes: `${HOST}/api/hurricanes`,
  counties: `${HOST}/api/counties`,
  aidOrganizations: `${HOST}/api/aid_organizations`,
}
export default Routes;
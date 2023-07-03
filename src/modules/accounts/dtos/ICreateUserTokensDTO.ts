interface ICreateUserTokenDTO {
  refresh_token: string,
  user_id: number,
  expires_date: Date,
}

export { ICreateUserTokenDTO }
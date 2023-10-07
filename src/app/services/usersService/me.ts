import { httpClient } from "../httpClient";
import { User } from "../../entities/User";

type MeResponse = User;

export async function me() {
  const { data } = await httpClient.get<MeResponse>("/users/me");

  return data;
}

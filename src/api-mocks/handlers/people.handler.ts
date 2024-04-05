import { rest } from "msw";

import { API_RESOURCE } from "../../app/shared/constant";
import { PEOPLE } from "../fixtures";
import { delayedResponse } from "../utils";

const BASE_URL = `/mock-api/${API_RESOURCE.PEOPLE}*`;
const sessionData = [...PEOPLE];

export const getPeople = rest.get(BASE_URL, (_req, _res, ctx) =>
  delayedResponse(ctx.status(200), ctx.json(sessionData)),
);

export const handlers = [getPeople];

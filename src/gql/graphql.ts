/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  entry: any;
};

export type ComputerAudio = {
  __typename?: "ComputerAudio";
  _id?: Maybe<Scalars["ID"]>;
  connected?: Maybe<Scalars["Boolean"]>;
  left?: Maybe<Scalars["Boolean"]>;
  mixer?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  right?: Maybe<Scalars["Boolean"]>;
  sub?: Maybe<Scalars["Boolean"]>;
};

export type ComputerAudioInput = {
  left?: InputMaybe<Scalars["Boolean"]>;
  master?: InputMaybe<Scalars["Boolean"]>;
  mixer?: InputMaybe<Scalars["Boolean"]>;
  right?: InputMaybe<Scalars["Boolean"]>;
  sub?: InputMaybe<Scalars["Boolean"]>;
};

export type DeadzoneInput = {
  deadzone?: InputMaybe<Scalars["String"]>;
  room?: InputMaybe<Scalars["String"]>;
};

export type DeleteSetpointInput = {
  day?: InputMaybe<Scalars["String"]>;
  deadZone?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  temp?: InputMaybe<Scalars["String"]>;
  time?: InputMaybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  deleteSetpoint?: Maybe<Room>;
  updateComputerAudio?: Maybe<ComputerAudio>;
  updateOffset?: Maybe<Sensor>;
  updatePlug?: Maybe<Plug>;
  updateRGBLights?: Maybe<RgbLight>;
  updateRoom?: Maybe<Room>;
  updateTimer?: Maybe<Timer>;
  updateValve?: Maybe<Valve>;
};

export type MutationDeleteSetpointArgs = {
  input?: InputMaybe<DeleteSetpointInput>;
};

export type MutationUpdateComputerAudioArgs = {
  input?: InputMaybe<ComputerAudioInput>;
};

export type MutationUpdateOffsetArgs = {
  input?: InputMaybe<OffsetsInput>;
};

export type MutationUpdatePlugArgs = {
  input?: InputMaybe<PlugInput>;
};

export type MutationUpdateRgbLightsArgs = {
  input?: InputMaybe<RgbLightInput>;
};

export type MutationUpdateRoomArgs = {
  input?: InputMaybe<RoomInput>;
};

export type MutationUpdateTimerArgs = {
  input?: InputMaybe<TimerInput>;
};

export type MutationUpdateValveArgs = {
  input?: InputMaybe<ValveInput>;
};

export type Plug = {
  __typename?: "Plug";
  _id?: Maybe<Scalars["ID"]>;
  connected?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  state?: Maybe<Scalars["Boolean"]>;
};

export type PlugInput = {
  name?: InputMaybe<Scalars["String"]>;
  state?: InputMaybe<Scalars["Boolean"]>;
};

export type Query = {
  __typename?: "Query";
  getComputerAudio?: Maybe<ComputerAudio>;
  getPlug?: Maybe<Plug>;
  getPlugs?: Maybe<Array<Maybe<Plug>>>;
  getRGBLight?: Maybe<RgbLight>;
  getRGBLights?: Maybe<Array<Maybe<RgbLight>>>;
  getRadiator?: Maybe<Radiator>;
  getRoom?: Maybe<Room>;
  getRooms?: Maybe<Array<Maybe<Room>>>;
  getSensor?: Maybe<Sensor>;
  getSensors?: Maybe<Array<Maybe<Sensor>>>;
  getTimer?: Maybe<Timer>;
  getTimers?: Maybe<Array<Maybe<Timer>>>;
  getValve?: Maybe<Valve>;
  getValves?: Maybe<Array<Maybe<Valve>>>;
};

export type QueryGetPlugArgs = {
  name?: InputMaybe<Scalars["String"]>;
};

export type QueryGetRgbLightArgs = {
  name?: InputMaybe<Scalars["String"]>;
};

export type QueryGetRadiatorArgs = {
  room?: InputMaybe<Scalars["String"]>;
};

export type QueryGetRoomArgs = {
  name?: InputMaybe<Scalars["String"]>;
};

export type QueryGetSensorArgs = {
  room?: InputMaybe<Scalars["String"]>;
};

export type QueryGetTimerArgs = {
  name?: InputMaybe<Scalars["String"]>;
};

export type QueryGetValveArgs = {
  room?: InputMaybe<Scalars["String"]>;
};

export type RgbLight = {
  __typename?: "RGBLight";
  _id?: Maybe<Scalars["ID"]>;
  blue?: Maybe<Scalars["Int"]>;
  connected?: Maybe<Scalars["Boolean"]>;
  green?: Maybe<Scalars["Int"]>;
  mode?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
  red?: Maybe<Scalars["Int"]>;
};

export type RgbLightInput = {
  blue?: InputMaybe<Scalars["Int"]>;
  green?: InputMaybe<Scalars["Int"]>;
  mode?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
  red?: InputMaybe<Scalars["Int"]>;
};

export type Radiator = {
  __typename?: "Radiator";
  inlet?: Maybe<Scalars["Float"]>;
  outlet?: Maybe<Scalars["Float"]>;
};

export type Room = {
  __typename?: "Room";
  deadzone?: Maybe<Scalars["String"]>;
  demand?: Maybe<Scalars["Int"]>;
  disabled?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  overrideTime?: Maybe<Scalars["Float"]>;
  setpoints?: Maybe<Setpoints>;
};

export type RoomInput = {
  deadzone?: InputMaybe<Scalars["String"]>;
  demand?: InputMaybe<Scalars["Int"]>;
  disabled?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  overrideTime?: InputMaybe<Scalars["Int"]>;
  setpoints?: InputMaybe<SetpointsIn>;
};

export type Sensor = {
  __typename?: "Sensor";
  _id?: Maybe<Scalars["ID"]>;
  connected?: Maybe<Scalars["Boolean"]>;
  humidity?: Maybe<Scalars["Float"]>;
  offset?: Maybe<Scalars["Float"]>;
  rawTemperature?: Maybe<Scalars["Float"]>;
  room?: Maybe<Scalars["String"]>;
  temperature?: Maybe<Scalars["Float"]>;
};

export type Setpoint = {
  __typename?: "Setpoint";
  deadzone?: Maybe<Scalars["String"]>;
  room?: Maybe<Scalars["String"]>;
  setpoints?: Maybe<Setpoints>;
};

export type Setpoints = {
  __typename?: "Setpoints";
  weekday?: Maybe<Scalars["entry"]>;
  weekend?: Maybe<Scalars["entry"]>;
};

export type Timer = {
  __typename?: "Timer";
  name?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["Float"]>;
};

export type TimerInput = {
  name?: InputMaybe<Scalars["String"]>;
  value?: InputMaybe<Scalars["Float"]>;
};

export type Valve = {
  __typename?: "Valve";
  _id?: Maybe<Scalars["ID"]>;
  connected?: Maybe<Scalars["Boolean"]>;
  room?: Maybe<Scalars["String"]>;
  state?: Maybe<Scalars["Boolean"]>;
};

export type ValveInput = {
  name?: InputMaybe<Scalars["String"]>;
  state?: InputMaybe<Scalars["Boolean"]>;
};

export type Days = {
  weekday?: InputMaybe<Scalars["Boolean"]>;
  weekend?: InputMaybe<Scalars["Boolean"]>;
};

export type OffsetsInput = {
  offset?: InputMaybe<Scalars["Float"]>;
  room?: InputMaybe<Scalars["String"]>;
};

export type SetpointsIn = {
  day?: InputMaybe<Scalars["String"]>;
  temp?: InputMaybe<Scalars["String"]>;
  time?: InputMaybe<Scalars["String"]>;
};

export type UpdateTimerMutationVariables = Exact<{
  input?: InputMaybe<TimerInput>;
}>;

export type UpdateTimerMutation = {
  __typename?: "Mutation";
  updateTimer?: { __typename?: "Timer"; value?: number | null; name?: string | null } | null;
};

export type GetLightsQueryVariables = Exact<{
  name1?: InputMaybe<Scalars["String"]>;
  name2?: InputMaybe<Scalars["String"]>;
  name3?: InputMaybe<Scalars["String"]>;
}>;

export type GetLightsQuery = {
  __typename?: "Query";
  lights?: Array<{
    __typename?: "RGBLight";
    name?: string | null;
    red?: number | null;
    green?: number | null;
    blue?: number | null;
    mode?: number | null;
    connected?: boolean | null;
    _id?: string | null;
  } | null> | null;
  floodlight?: { __typename?: "Plug"; name?: string | null; state?: boolean | null; connected?: boolean | null; _id?: string | null } | null;
  sun?: { __typename?: "Plug"; name?: string | null; state?: boolean | null; connected?: boolean | null; _id?: string | null } | null;
  lamp?: { __typename?: "Plug"; name?: string | null; state?: boolean | null; connected?: boolean | null; _id?: string | null } | null;
};

export type GetSetpointsQueryVariables = Exact<{
  room?: InputMaybe<Scalars["String"]>;
}>;

export type GetSetpointsQuery = {
  __typename?: "Query";
  room?: {
    __typename?: "Room";
    name?: string | null;
    demand?: number | null;
    deadzone?: string | null;
    setpoints?: { __typename?: "Setpoints"; weekend?: any | null; weekday?: any | null } | null;
  } | null;
  valve?: { __typename?: "Valve"; room?: string | null; state?: boolean | null; connected?: boolean | null; _id?: string | null } | null;
  sensor?: { __typename?: "Sensor"; room?: string | null; temperature?: number | null; offset?: number | null; _id?: string | null } | null;
  heating?: { __typename?: "Plug"; name?: string | null; state?: boolean | null; connected?: boolean | null; _id?: string | null } | null;
};

export type UpdateOffsetMutationVariables = Exact<{
  input?: InputMaybe<OffsetsInput>;
}>;

export type UpdateOffsetMutation = { __typename?: "Mutation"; updateOffset?: { __typename?: "Sensor"; room?: string | null } | null };

export type UpdateRoomMutationVariables = Exact<{
  input?: InputMaybe<RoomInput>;
}>;

export type UpdateRoomMutation = { __typename?: "Mutation"; room?: { __typename?: "Room"; name?: string | null } | null };

export const UpdateTimerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateTimer" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "TimerInput" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateTimer" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "input" }, value: { kind: "Variable", name: { kind: "Name", value: "input" } } },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "value" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateTimerMutation, UpdateTimerMutationVariables>;
export const GetLightsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getLights" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name1" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name2" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name3" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "lights" },
            name: { kind: "Name", value: "getRGBLights" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "red" } },
                { kind: "Field", name: { kind: "Name", value: "green" } },
                { kind: "Field", name: { kind: "Name", value: "blue" } },
                { kind: "Field", name: { kind: "Name", value: "mode" } },
                { kind: "Field", name: { kind: "Name", value: "connected" } },
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "floodlight" },
            name: { kind: "Name", value: "getPlug" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "name" }, value: { kind: "Variable", name: { kind: "Name", value: "name1" } } },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "state" } },
                { kind: "Field", name: { kind: "Name", value: "connected" } },
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "sun" },
            name: { kind: "Name", value: "getPlug" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "name" }, value: { kind: "Variable", name: { kind: "Name", value: "name2" } } },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "state" } },
                { kind: "Field", name: { kind: "Name", value: "connected" } },
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "lamp" },
            name: { kind: "Name", value: "getPlug" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "name" }, value: { kind: "Variable", name: { kind: "Name", value: "name3" } } },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "state" } },
                { kind: "Field", name: { kind: "Name", value: "connected" } },
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetLightsQuery, GetLightsQueryVariables>;
export const GetSetpointsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetSetpoints" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "room" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "room" },
            name: { kind: "Name", value: "getRoom" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "name" }, value: { kind: "Variable", name: { kind: "Name", value: "room" } } },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "demand" } },
                { kind: "Field", name: { kind: "Name", value: "deadzone" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "setpoints" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "weekend" } },
                      { kind: "Field", name: { kind: "Name", value: "weekday" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "valve" },
            name: { kind: "Name", value: "getValve" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "room" }, value: { kind: "Variable", name: { kind: "Name", value: "room" } } },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "room" } },
                { kind: "Field", name: { kind: "Name", value: "state" } },
                { kind: "Field", name: { kind: "Name", value: "connected" } },
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "sensor" },
            name: { kind: "Name", value: "getSensor" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "room" }, value: { kind: "Variable", name: { kind: "Name", value: "room" } } },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "room" } },
                { kind: "Field", name: { kind: "Name", value: "temperature" } },
                { kind: "Field", name: { kind: "Name", value: "offset" } },
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "heating" },
            name: { kind: "Name", value: "getPlug" },
            arguments: [{ kind: "Argument", name: { kind: "Name", value: "name" }, value: { kind: "StringValue", value: "heating", block: false } }],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "state" } },
                { kind: "Field", name: { kind: "Name", value: "connected" } },
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetSetpointsQuery, GetSetpointsQueryVariables>;
export const UpdateOffsetDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateOffset" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "offsetsInput" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateOffset" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "input" }, value: { kind: "Variable", name: { kind: "Name", value: "input" } } },
            ],
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "room" } }] },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateOffsetMutation, UpdateOffsetMutationVariables>;
export const UpdateRoomDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateRoom" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "RoomInput" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "room" },
            name: { kind: "Name", value: "updateRoom" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "input" }, value: { kind: "Variable", name: { kind: "Name", value: "input" } } },
            ],
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "name" } }] },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateRoomMutation, UpdateRoomMutationVariables>;

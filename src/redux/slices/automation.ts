import { duplicateValidate } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateTriggerProps = {
    trigger?: {
        type?: "COMMENT" | "DM"
        keyword?: string
        types?: string[]
        keywords?: string[]
    }
}

const InitialState: InitialStateTriggerProps = {
    trigger: {
        type: undefined,
        keyword: undefined,
        types: [],
        keywords: []
    }
}

export const AUTOMATION = createSlice({
        name: 'automation',
        initialState: InitialState,
        reducers: {
            TRIGGERS: (state, action: PayloadAction<InitialStateTriggerProps>) => {
                state.trigger!.types = duplicateValidate(
                    state.trigger?.types!,
                    action.payload.trigger?.type!
                )
                return state
            },
        }
})

export const {TRIGGERS} = AUTOMATION.actions
export default AUTOMATION.reducer
import type { BetCombinationRefType } from "../SportsYouWon.types";

export const BET_DATA: BetCombinationRefType = {
  "username": "test_user",
  "payout": 99.1,
  "currency": "INR",
  "status": "WON",
  "legs": [
    {
      "odds": 2.15,
      "outcomes": [
        {
          "eventGroupPath": "Football / Denmark / 1st Division",
          "eventName": "Vejle Boldklub - Randers FC",
          "criterionName": "Full Time",
          "outcomeLabel": "1"
        }
      ]
    },
    {
      "odds": 2.9,
      "outcomes": [
        {
          "eventGroupPath": "Football / Denmark / 1st Division",
          "eventName": "FC Fredericia - Hobro",
          "criterionName": "Full Time",
          "outcomeLabel": "1"
        }
      ]
    },
    {
      "odds": 3.15,
      "outcomes": [
        {
          "eventGroupPath": "Football / Denmark / 1st Division",
          "eventName": "Viborg FF - Esbjerg",
          "criterionName": "Full Time",
          "outcomeLabel": "1"
        }
      ]
    }
  ]
}

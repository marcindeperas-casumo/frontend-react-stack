// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { showTerms } from "Services/ShowTermsService";
import { OpenModalMutation } from "Features/sports/state";

export const SportsFooter = () => (
  <Flex
    className="c-sports-footer t-color-grey u-font-weight-bold u-padding--xlg"
    align="center"
    justify="center"
    style={{ textDecoration: "underline" }}
  >
    <Flex.Item>
      <span className="u-cursor-pointer" onClick={showTerms}>
        Sports T&amp;Cs
      </span>
    </Flex.Item>
    <Flex.Item>
      <OpenModalMutation variables={{ modal: "BETTING_GLOSSARY" }}>
        {openChooseFavouritesModal => (
          <span
            className="u-cursor-pointer"
            onClick={openChooseFavouritesModal}
          >
            Glossary
          </span>
        )}
      </OpenModalMutation>
    </Flex.Item>
  </Flex>
);

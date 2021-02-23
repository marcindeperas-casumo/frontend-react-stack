/* @flow */
import * as React from "react";
import { Mutation } from "@apollo/client/react/components";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../../../../node_modules/@apollo/clien... Remove this comment to see the full error message
import type { MutationResult } from "@apollo/client/react/components";
import type { FetchPolicy } from "@apollo/client";
export type MutationProps<D, V> = {
    mutation: any;
    variables?: V;
    children: (MutationResult<D>);
};
(React as any).Node,
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'fetchPolicy'.
    fetchPolicy ?  : FetchPolicy,
;
;
type DoMutationProps = {
    mutate: () => any;
};
class DoMutation extends React.Component<DoMutationProps> {
    componentDidMount() {
        this.props.mutate();
    }
    render() {
        return null;
    }
}
export class MutateOnMount<D> {
}
 * ;
{ }
V:  * ;
{ }
 > ;
React.Component <
    // @ts-expect-error ts-migrate(2693) FIXME: 'MutationProps' only refers to a type, but is bein... Remove this comment to see the full error message
    MutationProps < D, V >
    > {
        render() {
            const { children, ...other } = this.props;
            return (<Mutation {...other}>
        {(mutate, result) => {
                return (<>
              <DoMutation mutate={mutate}/>
              {children && children(result)}
            </>);
            }}
      </Mutation>);
        }
    };

import * as R from "ramda";
import { connect } from "react-redux";
import { fetchPageBySlug, getPage, isPageFetchedSelector } from "Models/cms";
import { hideModal } from "Models/modal";
import { mappings } from "./rsmodal.mappings";
import { Modal } from "./RSModal";

export default connect(
  (state, ownProps) => {
    const modalType = state.modal;
    const mapping = mappings[modalType];
    const {
      slug,
      customContent,
      titleGetter = R.propOr("", "title"),
      contentGetter = R.propOr("", "content"),
      onHideModal,
    } = mapping || {};
    const page = getPage(slug)(state);

    return {
      slug,
      customContent,
      modalType,
      t: R.isEmpty(page)
        ? null
        : {
            title: titleGetter(page),
            content: contentGetter(page),
          },
      isFetched: isPageFetchedSelector(slug)(state),
      onHideModal,
    };
  },
  {
    hideModal,
    fetchPageBySlug,
  },
  ({ isFetched, slug, ...stateProps }, dispatchProps, ownProps) => {
    // TODO(Casumo/home#26960) side-effect here seems like lesser evil ¯\_(ツ)_/¯
    if (!isFetched) {
      dispatchProps.fetchPageBySlug(slug);
    }

    return {
      ...stateProps,
      hideModal: () => {
        dispatchProps.hideModal();
        // eslint-disable-next-line no-unused-expressions
        stateProps?.onHideModal();
      },
    };
  }
)(Modal);

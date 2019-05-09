# Porting modals from old stack

1. Add new kind of modal in to type `ModalKind` in _Models/modal_
2. Add new entry inside `mappings` in _Components/RSModal/modal.mappings.js_ keep in mind that:
    * `slug` is required
    * depending on how bad shape of data from cms is you might need `titleGetter` or `contentGetter`. They get whole object returned from cms as first argument so if your value is deep or you have to join value from few fields do it here.
3. Modals with actions are not supported yet.
4. Modals that needs data from multiple slugs won't be supported.

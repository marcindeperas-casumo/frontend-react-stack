// @flow
export const basicForm = (
  target: string,
  url: string,
  method: string,
  parameters: Object
) => {
  const form = document.createElement("form");
  const body = document.body;

  const submit = () => {
    if (body) {
      body.appendChild(form);
      form.submit();
      body.removeChild(form);
    }
  };

  const addParam = (name: string, value: string) => {
    const input = document.createElement("input");
    input.setAttribute("name", name);
    input.setAttribute("value", value);
    input.setAttribute("type", "hidden");

    form.appendChild(input);
  };

  form.setAttribute("enctype", "application/x-www-form-urlencoded");
  form.setAttribute("target", target);
  form.setAttribute("method", "post");
  form.setAttribute("action", url);

  Object.keys(parameters).forEach(paramKey => {
    addParam(paramKey, parameters[paramKey]);
  });

  return {
    submit,
    addParam,
  };
};

import { component$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import { Content, fetchOneEntry, getBuilderSearchParams } from '@builder.io/sdk-qwik';

const BUILDER_API_KEY = `add builder api key here`;
const BUILDER_MODEL = 'page';

export const useBuilderContent = routeLoader$(async ({ url, error }) => {
  const builderContent = await fetchOneEntry({
    model: BUILDER_MODEL,
    apiKey: BUILDER_API_KEY,
    options: getBuilderSearchParams(url.searchParams),
    userAttributes: {
      urlPath: url.pathname,
    },
  });

  if (!builderContent) {
    throw error(404, 'File Not Found Home Page');
  }
  // return content fetched from Builder
  return builderContent;
});

export default component$(() => {
  const builderContent = useBuilderContent();

  return (
    <div>
      <Content
        model={BUILDER_MODEL}
        content={builderContent.value}
        apiKey={BUILDER_API_KEY}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};

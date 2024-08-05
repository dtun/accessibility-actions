import { render } from "@testing-library/react-native";
import "@testing-library/react-native/extend-expect";

import type { RenderOptions } from "@testing-library/react-native";

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function customRender(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };

import { widgetRegistry, WidgetTypeMap } from "./util/WidgetUtil";

type WidgetKey = keyof WidgetTypeMap;

export function WidgetFactory<K extends WidgetKey>(
  type: K,
  data: WidgetTypeMap[K]
): React.ReactElement {
  const WidgetComponent = widgetRegistry[type] as React.ComponentType<{ data: WidgetTypeMap[K] }>;
  return <WidgetComponent data={data} />;
}

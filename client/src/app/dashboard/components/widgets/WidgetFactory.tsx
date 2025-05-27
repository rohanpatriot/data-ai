// src/widgets/WidgetFactory.tsx
import { widgetRegistry, WidgetTypeMap } from "./util/WidgetUtil";

type WidgetKey = keyof WidgetTypeMap;

export function WidgetFactory<K extends WidgetKey>(
  type: K,
  data: WidgetTypeMap[K],
  id: string,
  refresh?: () => void,
  onReference ?: (widgetId: string) => void,
  props?: Record<string, unknown>
): React.ReactElement {
  const WidgetComponent = widgetRegistry[type] as React.ComponentType<
    { data: WidgetTypeMap[K] } & typeof props
  >;
  return <WidgetComponent data={data} id={id} refresh={refresh} onReference={onReference} {...props} />;
}

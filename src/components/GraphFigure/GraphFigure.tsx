import classnames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';
import CountUp from 'react-countup';
import { formatDecimalToUnit } from '../../utils/format';
import type { Maybe } from '../../graphql/__generated__/generated-documents';

/**
 *
 * @param value
 * @param description
 * @param link
 * @param icon
 * @param valueClassName
 * @param unit default is '%'
 * @param className
 * @constructor
 */
export const GraphFigure = ({
  value,
  description,
  icon,
  action,
  unit = '%',
  className,
  valueClassName = 'text-primary',
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  value: number | Maybe<number> | undefined;
  description: string | Maybe<string> | undefined;
  icon: ReactNode;
  action?: ReactNode;
  unit?: string;
  valueClassName?: string;
}) => (
  <div
    className={classnames(
      'GraphFigure flex flex-col justify-center items-center max-w-max',
      className
    )}
    {...props}
  >
    <div>{icon}</div>
    <div className={classnames('GraphFigureCountUp text-3xl', valueClassName)}>
      <CountUp formattingFn={(n) => formatDecimalToUnit(n, unit)} end={value ?? 0} />
    </div>
    <div className="GraphFigureDescription">{description}</div>
    {action}
  </div>
);

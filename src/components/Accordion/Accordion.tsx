import type { HTMLAttributes } from 'react';
import SparkSVG from '../../assets/icons/spark/spark.svg';
import ChevronSVG from '../../assets/icons/chevron/chevron.svg';
import { Disclosure, Transition } from '@headlessui/react';
import classnames from 'classnames';

export type AccordionThemeColor =
  | 'primary'
  | 'secondary'
  | 'grey'
  | 'success'
  | 'warning'
  | 'error';

export type AccordionProps = {
  title: string;
  defaultOpen?: boolean;
  theme?: AccordionThemeColor;
};

const strokeTheme = (theme: AccordionThemeColor) => {
  switch (theme) {
    case 'primary':
      return 'stroke-primary';
    case 'secondary':
      return 'stroke-secondary';
    case 'success':
      return 'stroke-success';
    case 'warning':
      return 'stroke-warning';
    case 'error':
      return 'stroke-error';
    default:
      return 'stroke-grey';
  }
};

const fillTheme = (theme: AccordionThemeColor) => {
  switch (theme) {
    case 'primary':
      return 'fill-primary';
    case 'secondary':
      return 'fill-secondary';
    case 'success':
      return 'fill-success';
    case 'warning':
      return 'fill-warning';
    case 'error':
      return 'fill-error';
    default:
      return 'fill-grey';
  }
};

export const Accordion = ({
  id,
  children,
  title,
  defaultOpen = false,
  theme = 'secondary',
}: AccordionProps & HTMLAttributes<HTMLDivElement>) => (
  <div id={id} className="Accordion bg-white border border-grey-200 rounded-lg">
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className="AccordionTriggerButton py-4 w-full flex gap-4 px-4 items-center font-medium justify-between">
            <div className="AccordionLeftIcon h-8 w-8">
              <SparkSVG className={strokeTheme(theme)} />
            </div>
            <span className="AccordionTitle text-left flex-1">{title}</span>
            <div
              className={classnames(
                'AccordionChevronIcon h-8 w-8 transform duration-500 rotate-180',
                {
                  '-rotate-0': open,
                }
              )}
            >
              <ChevronSVG className={fillTheme(theme)} />
            </div>
          </Disclosure.Button>
          <Transition
            enter="transition-all duration-200 ease-in"
            enterFrom="transform opacity-0"
            enterTo="transform h-full opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform h-full opacity-100"
            leaveTo="transform h-0 opacity-0"
          >
            <Disclosure.Panel className="AccordionContent px-8 py-4 border-t-[1px] border-grey-200">
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  </div>
);

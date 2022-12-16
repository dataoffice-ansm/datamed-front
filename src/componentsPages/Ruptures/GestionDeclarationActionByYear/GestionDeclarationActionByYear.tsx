import type { HTMLAttributes } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { ChartBox } from '../../../components/ChartBox';
import type { GlobalRupture } from 'graphql/__generated__/generated-documents';
import type { SelectOption } from '../../../components/Select/Select';
import { Select } from '../../../components/Select/Select';
import { NotEnoughData } from 'components/NotEnoughData';
import { BoxInfo } from '../../../components/BoxInfo';
import FolderSVG from '../../../assets/icons/folder/folder.svg';
import DeclarationWithOneActionSvg from '../../../assets/images/actions/declaration-avec-au-moin-une-mesure.svg';
import { SectionTitle } from '../../../components/SectionTitle';

export type GestionDeclarationActionByYearProps = {
  ruptures: GlobalRupture;
  defaultOption?: OptionsValue;
} & HTMLAttributes<HTMLDivElement>;

const unitOptions = {
  percent: { label: 'Pourcentage' },
  number: { label: 'Nombre' },
} as const;

type OptionsValue = keyof typeof unitOptions;

const selectUnitOptions: Array<SelectOption<OptionsValue>> = Object.entries(unitOptions).map(
  ([k, v]) => ({
    value: k as OptionsValue,
    ...v,
  })
);

const findOptionIndex = (selectedOption: OptionsValue) =>
  (Object.keys(unitOptions) as OptionsValue[]).findIndex((option) => option === selectedOption);

export const GestionDeclarationByYear = ({
  ruptures,
  defaultOption = 'number',
}: GestionDeclarationActionByYearProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedUnitOption, setSelectedUnitOption] = useState<OptionsValue>(defaultOption);

  const onUnitOptionChange = useCallback((optionKey: OptionsValue) => {
    setSelectedUnitOption(optionKey);
  }, []);

  const options = useMemo(
    () =>
      (ruptures?.ruptureYears ?? []).map((ruptureYear) => ({
        value: ruptureYear?.value,
        label: ruptureYear?.value,
      })),
    [ruptures?.ruptureYears]
  );

  const onSelectedYear = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const selectedData = useMemo(
    () =>
      (ruptures?.totalAction ?? []).find(
        (element) => element?.year === options[selectedIndex].value
      ),
    [options, ruptures?.totalAction, selectedIndex]
  );

  const percentWithOneAction = `${
    Math.round(Math.round(selectedData?.totalWithOneAction ?? 0) / (selectedData?.total ?? 1)) * 100
  } %`;
  return (
    <div>
      {(ruptures?.ruptureYears ?? []).length > 0 ? (
        <>
          <SectionTitle
            title="Gestion des déclarations de ruptures et risques de rupture de stocks"
            subTitle={`Données mises à jour mensuellement, issues de la période ${
              selectedData?.year ?? '- année non disponible'
            }`}
          >
            <Select
              theme="secondary-variant"
              defaultOptionIndex={findOptionIndex(defaultOption)}
              options={selectUnitOptions}
              className="my-2"
              onSelectOption={(index, option) => {
                onUnitOptionChange(option.value as OptionsValue);
              }}
            />
            <Select
              options={options as unknown as SelectOption[]}
              theme="secondary-variant"
              onSelectOption={onSelectedYear}
            />
          </SectionTitle>
          <div className="flex gap-8 flex-col md:flex-row">
            <BoxInfo
              title={`${
                selectedUnitOption === 'number'
                  ? selectedData?.totalWithOneAction
                  : percentWithOneAction
              }`}
              icon={<DeclarationWithOneActionSvg />}
              theme="dark-green"
              className="my-8"
            >
              des dossiers ont donné lieu à au moins une mesure
            </BoxInfo>
            <BoxInfo
              title={selectedData?.total?.toString() ?? ''}
              icon={<FolderSVG />}
              theme="dark-green"
              className="my-8"
            >
              Nombre de mesures par année
            </BoxInfo>
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center items-center">
          <NotEnoughData />
        </div>
      )}
    </div>
  );
};

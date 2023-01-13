import type { HTMLAttributes } from 'react';
import { useMemo } from 'react';
import tailwindPaletteConfig from '../../../../tailwind.palette.config';
import type { SelectOption } from 'components/Select';
import { BarChart } from '../../../components/Charts/BarChart';
import { useRupturesPageContext } from '../../../contexts/RupturesPageContext';
import { buildSortedRangeData } from '../../../utils/entities';
import {
  type TherapeuticClassesRupturesPerYear,
  type TherapeuticClassRupture,
} from '../../../graphql/__generated__/generated-documents';
import { GraphBoxSelect } from '../../../components/GraphBoxSelect';

export const RepartitionPerTherapeuticClassSection = (_props: HTMLAttributes<HTMLDivElement>) => {
  const { ruptures } = useRupturesPageContext();

  const options: SelectOption[] = useMemo(
    () =>
      ruptures?.ruptureYears
        ? ruptures.ruptureYears.reduce<SelectOption[]>(
            (carry, ruptureYear) =>
              ruptureYear?.value
                ? [
                    ...carry,
                    {
                      value: ruptureYear.value,
                      label: ruptureYear.value.toString(),
                    },
                  ]
                : carry,
            []
          )
        : [],
    [ruptures?.ruptureYears]
  );

  return (
    <GraphBoxSelect
      className="RepartitionPerTherapeuticClass"
      theme="secondary-variant"
      title="Nombre de déclarations de ruptures et risques de rupture de stock par classe
              thérapeutique"
      yearsOptions={options}
      tooltip={
        <>
          <p className="font-medium text-xl">
            Nombre de déclarations de ruptures ou de risques de rupture de stock par classe
            thérapeutique
          </p>
          <p>
            Le Système de classification anatomique, thérapeutique et chimique (en anglais :
            Anatomical Therapeutic Chemical (ATC) Classification System) est utilisé pour classer
            les médicaments. C&apos;est le Collaborating Centre for Drug Statistics Methodology de
            l&apos;Organisation Mondiale de la Santé (OMS) qui le contrôle. Les médicaments sont
            divisés en groupes selon l&apos;organe ou le système sur lequel ils agissent ou leurs
            caractéristiques thérapeutiques et chimiques.
          </p>
          <p>
            Ce graphique représente le nombre de déclarations reçues par classe thérapeutique
            (classification ATC). La courbe bleue indique le nombre de présentations de médicaments
            (une présentation correspond à un conditionnement précis d&apos;un médicament, par
            exemple une boîte de 30 gélules et une boîte de 90 gélules d&apos;un même médicament
            sont deux présentations différentes) que contient la classe. Dans sa globalité, ce
            graphique permet d&apos;apprécier le nombre de déclarations reçues par rapport au nombre
            de médicaments disponibles.
          </p>
        </>
      }
      render={({ selectedYearOption }) => {
        const therapeuticDataForSelectedYear =
          ruptures.repartitionPerTherapeuticClass && selectedYearOption
            ? ruptures.repartitionPerTherapeuticClass.find(
                (element) => element?.year === selectedYearOption
              )
            : ([] as TherapeuticClassesRupturesPerYear);

        const therapeuticRepartitionForSelectedYear = buildSortedRangeData<TherapeuticClassRupture>(
          therapeuticDataForSelectedYear?.repartition,
          'number'
        );

        const labels = therapeuticRepartitionForSelectedYear.map((e) => e.name);

        const datasets = [
          {
            id: 1,
            label: 'Nombre de signalements',
            backgroundColor: tailwindPaletteConfig.darkGreen[300],
            borderColor: tailwindPaletteConfig.darkGreen[300],
            data: therapeuticRepartitionForSelectedYear?.map((element) => element?.value),
          },
        ];

        return (
          <div className="min-h-[256px] md:min-h-[512px] lg:min-h-[600px] w-full relative">
            <BarChart
              className="flex justify-center mt-4 w-full h-full absolute"
              labels={labels as unknown as never}
              datasets={datasets}
              leftLegend="Nombre de signalements"
              bottomLegend="Classe thérapeutique"
            />
          </div>
        );
      }}
    />
  );
};

import { CardWithImage } from '../../../components/CardWithImage/CardWithImage';

import OutOfStockSvg from '../../../assets/images/out_of_stock.svg';
import SickPersonSvg from '../../../assets/images/sick_person.svg';

export const MoreInfoSection = () => (
  <div className="w-full flex justify-center items-center flex-col py-16">
    <h2 className="py-4 text-2xl md:text-3xl font-medium">Statistiques globales</h2>
    <p className="max-w-2xl text-lg md:text-xl text-center mb-16">
      Envie d’en savoir plus sur les données qui constituent ce site ?<br />
      Consultez les déclarations reçues par l’ANSM pour l’ensemble des médicaments et substances
      actives autorisés sur le territoire national.
    </p>

    <div className="m-auto max-w-xl lg:max-w-6xl">
      <CardWithImage
        className="mb-8"
        title="Déclarations de ruptures et risques de rupture de stock de médicament"
        description="Consultez les statistiques globales sur l'historique des déclarations de rupture et de risque de rupture des  médicaments d'intérêt thérapeutique majeur."
        href="/ruptures"
        image={<OutOfStockSvg />}
      />
    </div>

    <div className="m-auto max-w-xl lg:max-w-6xl">
      <CardWithImage
        className="mb-8"
        title="Déclarations de cas d’effets indésirables"
        description="Consultez les données de déclaration d’effets indésirables reçues, utilisées par les agents de l’ANSM dans le cadre de la surveillance des effets indésirables tout au long de la vie du médicament."
        href="/globaldec"
        image={<SickPersonSvg className="h-full" />}
      />
    </div>
  </div>
);

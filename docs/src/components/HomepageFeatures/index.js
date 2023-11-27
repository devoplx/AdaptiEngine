import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Intelligent Game Data Management',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        NodeCraft Engine takes care of the heavy lifting by intelligently handling player data. From storage to retrieval, this feature ensures efficient management, allowing developers to focus on crafting engaging gameplay experiences without the intricacies of backend operations.
      </>
    ),
  },
  {
    title: 'Seamless Inventory Integration',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Elevate your game with NodeCraft's integrated inventory management system. Easily implement, customize, and optimize player inventories, items, and equipment. This feature streamlines development, enhancing the overall player experience and providing developers with a powerful toolset for creating intricate in-game economies.
      </>
    ),
  },
  {
    title: 'Adaptable AI Toolkit',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        NodeCraft Engine simplifies AI development with a flexible and powerful toolkit. From basic behaviors to advanced decision-making processes, developers can seamlessly integrate intelligent and dynamic in-game characters. This feature empowers game creators to bring their virtual worlds to life with responsive and engaging AI, without the need for extensive coding expertise.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

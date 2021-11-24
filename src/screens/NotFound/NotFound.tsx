import { NotFoundIcon } from '../../components/Icons';
import Link3D from '../../components/Link3D';

const NotFound: React.FC = () => {
  return (
    <section className="flex justify-center flex-1 lg:items-center">
      <div className="flex flex-col-reverse justify-end w-full max-w-4xl p-2 lg:shadow-2xl lg:flex-row">
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
          <div className="w-full text-center lg:text-left lg:w-64">
            <div className="mt-8 lg:mt-0">
              <h3 className="text-5xl font-bold tracking-tight text-gray-800">
                404
              </h3>
              <div className="w-1/4 h-0 mx-auto border-b-2 border-pink-400 lg:mx-0 lg:w-8"></div>
            </div>
            <p className="my-4 text-gray-700">
              Ooops... looks like you got lost
            </p>
            <div className="inline-block mt-2">
              <Link3D to="/">GO HOME</Link3D>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center bg-gray-200 lg:w-1/2 h-84">
          <NotFoundIcon className="w-64 lg:h-72" />
        </div>
      </div>
    </section>
  );
};

export default NotFound;

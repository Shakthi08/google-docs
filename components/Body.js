import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon'


function Body(){
    return(
        <section className='px-10 bg-white md:px-0'>
        <div className='max-w-3xl py-8 mx-auto text-sm text-gray-700'>
          <div className='flex items-center justify-between pb-5'>
            <h2 className='flex-grow font-medium'>My documents</h2>
            <p className='mr-12 '>Date created</p>
            <Icon name="folder" size="3xl" color="gray"/>
          </div>
        </div>
      </section>
    );
}

export default Body;
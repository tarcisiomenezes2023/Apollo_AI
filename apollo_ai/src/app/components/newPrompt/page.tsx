
const NewPrompt = () => {


  return (
    <>
      <div className='pb-24'></div>
      <div>
        <form 
          className='w-3/5 absolute bottom-4 bg-[#2c2937] rounded-3xl flex items-center gap-5 p-0.5'>
            <input
              type="text"
              name='text'
              placeholder='Ask anything...'
              className='flex-1 p-5 border-none outline-none bg-transparent text-[#ececec]'
            />
            <button type='submit'
              className='rounded-3xl bg-[#605e68] border-none p-2.5 flex items-center justify-center cursor-pointer'>
              <img src="/arrow.png" alt="send icon" className='w-5 h-5' />
            </button>
        </form>
      </div>
    </>
  );
};

export default NewPrompt;

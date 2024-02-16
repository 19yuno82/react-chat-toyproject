import React, { useCallback, useState } from 'react'

function NicknameForm({handleSubmitNickname}) {
    const [nickname, setNickname]= useState('');

    const handleChangeNickname = useCallback(e=>{
        setNickname(e.target.value);
    },[]);

    const handleSubmit = useCallback(()=>{
        handleSubmitNickname(nickname);
        setNickname('');
    },[handleSubmitNickname, nickname]);

  return (
    <form className='d-flex'>
        <div className='card d-flex flex-row align-items-center'>
            <label htmlFor='user-name-input' style={{width:80}}>
                닉네임
            </label>
            <input
            type='text'
            className='form-control w300'
            id='user-name-input'
            maxLength={12}
            value={nickname}
            onChange={handleChangeNickname}
            onKeyDown={e=>{
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit();
                }
            }}
            />
            <button
            type='button'
            className='btn btn-primary send-btn'
            value='변경'
            onClick={handleSubmit}
            />
        </div>
    </form>
  )
}

export default NicknameForm
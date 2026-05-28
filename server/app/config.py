

from pydantic_settings import BaseSettings



class Settings(BaseSettings):

    PORT: int = 8000
    DEBUG: bool = True


settings = Settings()





    
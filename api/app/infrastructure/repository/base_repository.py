from typing import Generic, TypeVar, List, Optional
from uuid import UUID
from sqlalchemy.orm import Session

T = TypeVar('T')  # Tipo genérico para ORM
E = TypeVar('E')  # Tipo genérico para Entity

class BaseRepository(Generic[T, E]):
    def __init__(self, db: Session, model_class: type[T]):
        self.db = db
        self.model_class = model_class
    
    def obter_por_id(self, id: UUID) -> Optional[E]:
        model = self.db.query(self.model_class).filter(self.model_class.id == id).first()
        return self._to_entity(model) if model else None
    
    def listar_todos(self) -> List[E]:
        models = self.db.query(self.model_class).all()
        return [self._to_entity(model) for model in models]
    
    def salvar(self, entity: E) -> E:
        model = self._to_model(entity)
        self.db.add(model)
        self.db.commit()
        self.db.refresh(model)
        return self._to_entity(model)
    
    def _to_entity(self, model: T) -> E:
        """Método ABSTRATO - deve ser implementado por cada repository"""
        raise NotImplementedError("Método _to_entity deve ser implementado")
    
    def _to_model(self, entity: E) -> T:
        """Método ABSTRATO - deve ser implementado por cada repository"""
        raise NotImplementedError("Método _to_model deve ser implementado")